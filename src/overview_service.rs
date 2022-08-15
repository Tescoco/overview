use crate::db;
use crate::models::{NewOverView, OverView};
use crate::schema::overview;
use diesel::prelude::*;
use diesel::result::Error;
use std::time::SystemTime;

pub fn create_overview(mut new_overview: NewOverView) -> OverView {
  let connection = db::create_connection();
  connection
    .transaction::<OverView, Error, _>(|| {
      new_overview.created = Some(SystemTime::now());
      let overview: OverView = diesel::insert_into(overview::table)
        .values(&new_overview)
        .get_result(&connection)
        .unwrap();
      Ok(overview)
    })
    .unwrap()
}

pub fn get_overviews() -> Vec<OverView> {
  let connection = db::create_connection();
  overview::table.load::<OverView>(&connection).unwrap()
}
