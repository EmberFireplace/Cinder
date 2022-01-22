=================
ServerIcon
=================

--------
HTML/CSS
--------

The servers are currently displayed as a circular draggable object, sortable, but will be hexagons in the future,
with the option to upload custom SVGs.

---------
Variables
---------

########
Internal
########

serverURL - is dynamically calculated from the instanceOfServerObject

########
Exported
########


serverObject - the instance of the :ref:`serverObject<ServerObject>`\ set in the :ref:`ServerSidebar<ServerSidebar>`.

-------
Events
-------

^^^^^^^^^^^^^^^
ServerIconClick
^^^^^^^^^^^^^^^

:ref:`serverIconClick<ServerIconClick>` is an event that is called when a server icon is clicked and passes the instanceOfServerObject

