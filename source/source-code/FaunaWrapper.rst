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

This function takes in a :ref:`ServerID<ServerID>` and uses it to get all the :ref:`Channels<Channel>` in that :ref:`Server<Server>`.

-------
Classes
-------

############
ServerObject
############

ServerObject is a container that parses a json string into all the variables that a server cares about, these are :

.. parsed-literal::

    serverName:string
    serverID:string
    serverOwnerID
    serverIconURL
    timestamp //The creation or last update of the Server object, is updated whenever we add, remove, or edit channels.


#############
ChannelObject
#############

ChannelObject is a container like :ref:`ServerObject<ServerObject>` that parses a json string into all the variables a channel
would care about:

.. parsed-literal::

    channelName:string
    channelID:string
    channelType:string
    timestamp:string //See :ref:`ServerObject<ServerObject>` for this.