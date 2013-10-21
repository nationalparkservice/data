# Fire Data

This directory contains up-to-date information about active fires in the United States.

The fire perimeters are pulled in every five minutes from the USGS GeoMAC system: [http://rmgsc.cr.usgs.gov/outgoing/GeoMAC/](http://rmgsc.cr.usgs.gov/outgoing/GeoMAC/). They are validated, converted to individual GeoJSON files, and posted to this repository. The "active-fires-index.json" file contains an array of the names of the active fire polygons. This can be used, programatically or otherwise, to figure out which fires are currently active.

Updates to the fire perimeters are tracked as well. You can view the history of the GeoJSON files to see changes that were made to a fire perimeter over time.

This process has been running every five minutes since August 30th 2013, 9:35:30, with a disruption from October 1, 2013 to October 17, 2013 because of the US federal government shutdown.

## Node Task

The code for the node.js task that runs every five minutes can be found here: [https://github.com/nationalparkservice/node-tasks/tree/master/update-fire-perimeters](https://github.com/nationalparkservice/node-tasks/tree/master/update-fire-perimeters).

## Feedback

See a problem with the process/data? [Open and issue](https://github.com/nationalparkservice/data/issues) or send us an email at <a href="mailto">npmap@nps.gov</a>.
