# Park Boundaries

This directory contains boundary data for all National Parks. These are pulled from the official boundary dataset, which is maintained by the National Park Service's Land Resources Division. You can view the full XML metadata and download a shapefile of the complete dataset on the [NPS Data Store](https://irma.nps.gov/App/Reference/Profile/2196725).

## Contents

GeoJSON and TopoJSON files for:

  - Each park (e.g. acad.geojson and acad.topojson)
  - All parks: parks.geojson and parks.topojson
  - Bounding boxes for all parks: parks-bounds.geojson
  - Centroids for all parks: parks-centroids.geojson

## Processing

This repository is updated each time a new version of the official park boundaries dataset is released -- usually on a quarterly basis.

We pull data from the shapefile, clean up the attributes (trimming extra start and end whitespace), and create GeoJSON and TopoJSON files.

One important note: Some NPS units have more than one polygon record in the official boundary dataset. During the processing, we combine all of the polygons for a single unit into a GeoJSON `FeatureCollection` object.
