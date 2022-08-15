use crate::schema::overview;
use diesel::Queryable;
use rocket::serde::{Deserialize, Serialize};

#[derive(Queryable, Identifiable, Serialize, Deserialize)]
#[table_name = "overview"]
pub struct OverView {
    pub id: i32,
    pub lat: Option<String>,
    pub lon: Option<String>,
    pub title: Option<String>,
    pub context: Option<String>,
    pub created: Option<std::time::SystemTime>,
}

#[derive(Insertable, Deserialize)]
#[table_name = "overview"]
pub struct NewOverView {
    pub lat: Option<String>,
    pub lon: Option<String>,
    pub title: Option<String>,
    pub context: Option<String>,
    pub created: Option<std::time::SystemTime>,
}
