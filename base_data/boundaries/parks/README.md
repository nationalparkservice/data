# Park Boundaries

This directory contains park boundary data for all National Park Service units. These are pulled from the official boundary dataset, which is maintained by the National Park Service's Land Resources Division. You can view the full XML metadata and download a shapefile of the complete dataset on the [NPS Data Store](https://irma.nps.gov/App/Reference/Profile/2196725).

## Contents

GeoJSON and TopoJSON files for:

  - Each park (e.g. acad.geojson and acad.topojson)
  - All parks: parks.geojson and parks.topojson
  - Bounds for all parks: parks-bounds.geojson
  - Centroids for all parks: parks-centroids.geojson

## Processing

This repository is updated each time a new version of the official park boundaries dataset is released.

We pull data from the shapefile, clean up the attributes (trimming extra start and end whitespace), and create GeoJSON and TopoJSON files.

One more important note: Some NPS units have multiple polygon records in the official shapefile dataset. During the processing, we combine all of the polygons for a unit into a GeoJSON FeatureCollection object.
