=============
ServerSidebar
=============

.. _ServerSidebar:

--------
HTML/CSS
--------

Implements SortableList_ so ServerIcon_\ s in a list so they can be dragged around.

.. note::

    Implement ServerIcons so that when they are dragged it is updated ServerSide so it is persisted.

---------
Variables
---------

########
Internal
########

**********
ServerList
**********

list - Is the :ref:`Server List<ServerList>` , but needs to be named list because of restrictions of the :ref:`SortableList<SortableList>`
component.

:ref:`userID<UserID>` - Used for the :ref:`paginateForServersFromUser<PaginateForServersFromUser>` function to add servers to the :ref:`Server List<ServerList>`

const sortList - I don't know what this does but it is imported code from the example of :ref:`SortableList<SortableList>`

------
Events
------

Passes :ref:`serverIconClick<ServerIconClick>` event up.
