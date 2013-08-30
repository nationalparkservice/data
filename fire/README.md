# Fire Data

This repository contains up-to-date information about fires that are active in the United States.

The data are pulled in every five minutes from the USGS GeoMAC system: http://rmgsc.cr.usgs.gov/outgoing/GeoMAC/. They are validated, converted to individual GeoJSON files, and posted to this repository. The "active-fires-index.json" file contains an array of the names of the active fire polygons. This can be used to figure out which fires are currently active.

Changes to the fire polygons are tracked, as well. You can view the history of the GeoJSON files to see changes that were made to the fire perimeter.

This process has been running every five minutes since August 30th 2013, 9:35:30.