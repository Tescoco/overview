#[macro_use]
extern crate rocket;
#[macro_use]
extern crate diesel;
extern crate diesel_migrations;
use rocket::fairing::{Fairing, Info, Kind};
use rocket::fs::{relative, FileServer};
use rocket::http::Header;
use rocket::serde::json::Json;
use rocket::{Request, Response};
mod db;
mod models;
mod overview_service;
mod schema;

#[post("/save", data = "<payload>")]
fn save_overview(payload: Json<models::NewOverView>) -> Json<models::OverView> {
    let new_overview = payload.into_inner();
    Json(overview_service::create_overview(new_overview))
}

#[get("/get-all")]
fn get_overviews() -> Json<Vec<models::OverView>> {
    Json(overview_service::get_overviews())
}

pub struct CORS;

#[rocket::async_trait]
impl Fairing for CORS {
    fn info(&self) -> Info {
        Info {
            name: "Attaching CORS headers to responses",
            kind: Kind::Response,
        }
    }

    async fn on_response<'r>(&self, _request: &'r Request<'_>, response: &mut Response<'r>) {
        response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
        response.set_header(Header::new(
            "Access-Control-Allow-Methods",
            "POST, GET, PATCH, OPTIONS",
        ));
        response.set_header(Header::new("Access-Control-Allow-Headers", "*"));
        response.set_header(Header::new("Access-Control-Allow-Credentials", "true"));
    }
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(CORS)
        .mount("/", FileServer::from(relative!("client/build")))
        .mount("/api", routes![save_overview, get_overviews])
}
