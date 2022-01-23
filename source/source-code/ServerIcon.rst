=================
ServerIcon
=================

-------------------
ServerIcon HTML/CSS
-------------------

The servers are currently displayed as a circular draggable object, sortable, but will be hexagons in the future,
with the option to upload custom SVGs.

--------------------
ServerIcon Variables
--------------------

#############################
ServerIcon Internal Variables
#############################

serverURL - is dynamically calculated from the instanceOfServerObject

#############################
ServerIcon Exported Variables
#############################


serverObject - the instance of the :ref:`serverObject<ServerObject>`\ set in the :ref:`ServerSidebar<ServerSidebar>`.

-----------------
ServerIcon Events
-----------------

###############
ServerIconClick
###############

:ref:`serverIconClick<ServerIconClick>` is an event that is called when a server icon is clicked and passes the instanceOfServerObject

