# Park Boundaries

This directory contains park boundary polygons for all National Park Service units. These are pulled from the official boundary dataset, which is maintained by the National Park Service's Land Resources Division. You can view the full XML metadata and download a shapefile of the complete dataset on the [NPS Data Store](https://irma.nps.gov/App/Reference/Profile/2196725).

## Processing

This repository is updated each time a new version of the official park boundaries dataset is released.

We pull data from the shapefile, clean up the attributes (trimming extra start and end whitespace), and create GeoJSON and TopoJSON files. Each park has its own GeoJSON and TopoJSON files, and the complete dataset is available as both GeoJSON and TopoJSON as well (all.geojson/all.topojson).

One more important note: Some NPS units have multiple polygon records in the official shapefile dataset. During the processing, we combine all of the polygons for a unit into a GeoJSON FeatureCollection object.