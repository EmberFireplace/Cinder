============
FaunaWrapper
============

This is a typescript wrapper written for Classes to more easily parse JSON from Fauna as well as
used to encapsulate Fauna queries into more managable and descriptive static functions

-------------
Fauna Queries
-------------

All the FaunaQueries are held in the ServerFaunaAPI class

.. _paginateForServersFromUser:

##########################
PaginateForServersFromUser
##########################

This function takes in a :ref:`UserID<UserID>` and uses it to get all :ref:`Servers<Server>` that a :ref:`User<User>` is in.

.. _paginateForChannelsFromServer:

#############################
PaginateForChannelsFromServer
#############################

This function takes in a :ref:`ServerID<ServerID>` and uses it to get all the :ref:`Channels<Channel>`\ in that :ref:`Server<Server>`.