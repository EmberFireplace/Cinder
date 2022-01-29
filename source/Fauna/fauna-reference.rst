===============
Fauna Reference
===============

-------------------------
Fauna Reference Reference
-------------------------

####
Info
####

Pretty self-explanitory, tells you the general purpose of the Object and what its trying to accomplish by existing.

#########
Reference
#########

All the variables, terms, values, and any other strictly programmatic data relevant as reference for the Object.

*******************
Reference Variables
*******************

Formatted with the variable name, and then a colon, and then how the variable is best represented/stored in Fauna.

#######
Related
#######

A list of all the related Objects with links to their References.

----------------
Indexes(Indices)
----------------

############
UsersByEmail
############

*****************
UsersByEmail Info
*****************

Users by email takes in a email tag and spits out a user. It is to be used with the
`Login <https://docs.fauna.com/fauna/current/api/fql/functions/login?lang=javascript>`_ function to log users in when provided with a password.

**********************
UsersByEmail Reference
**********************

^^^^^^^^^^^^^^^^^^
UsersByEmail Terms
^^^^^^^^^^^^^^^^^^

data.email

^^^^^^^^^^^^^^^^^^^
UsersByEmail Values
^^^^^^^^^^^^^^^^^^^

none

^^^^^^^^^^^^^^^^^^^^^^
UsersByEmail Modifiers
^^^^^^^^^^^^^^^^^^^^^^

Unique,
Serialized


-----------
Collections
-----------

#####
Users
#####

**********
Users Info
**********

The Users collection contains all the Users `Documents <https://docs.fauna.com/fauna/current/learn/understanding/documents?lang=javascript>`_ and contain data such as Usernames
and links to :ref:`Profile Pictures<ProfilePicture>`\ .

***************
Users Reference
***************

.. parsed-literal::

    username: String
    email: String
    profileIconURL: String
    userBio: String


#######
Servers
#######

***********
Server Info
***********

The Servers collection contains all the Server `Documents <https://docs.fauna.com/fauna/current/learn/understanding/documents?lang=javascript>`_ and
contain very minimal data. The data they do contain are just things like the name and icon of the Server. The Server collection is useful mostly in indexing,
to find Channels and relations to :ref:`ChannelUpdate<ChannelUpdate>` and :ref:`ChannelCreate<ChannelCreate>` collections.

****************
Server Reference
****************

.. parsed-literal::

    serverName: String
    serverIcon: String
    serverOwner: Ref(Collection("Users"), "[FaunaID]")


**************
Server Related
**************

:ref:`ChannelUpdate<ChannelUpdate>`\ , :ref:`ChannelCreate<ChannelCreate>`\ , :ref:`Channels<Channels>`\ , and TODO complete this list.


###########
ServerUsers
###########

****************
ServerUsers Info
****************

The ServerUsers collection is used to store a pair of every :ref:`User<Users>` and :ref:`Server<Servers>` along with a number
indicating the ordering preference the :ref:`User<Users>` has for the :ref:`Servers<Servers>`

*********************
ServerUsers Reference
*********************

.. parsed-literal::

    serverID: Ref(Collection(Servers), "[FaunaID]")
    userID: Ref(Collection(Users), "[FaunaID]")
    userPreferenceNumber: Long


########
Channels
########

*************
Channels Info
*************

Channels is a collection that has a subcategory of either being
an actual CHANNEL a CATEGORY or a THREAD.
Channels can stand alone, or be under/contain any number of other channels.

Channels Threads and Categories are similar to Discords way of doing them.
However, you can have sub-threads that go on as much as you want, you can
create multiple sub categories, and you can place channels below other channels.

Channels also have permissions for roles and individuals specified
in :ref:`User Permissions List<User Permissions List>`

the channelParentID is the id of whatever parent, or is null if it has no parent, in
which case it just floats in the server.

channelType is either a "Channel" "Thread" "Category".

channel children are discovered using the ChannelChildrenByChannelID Index.

channelIconURL is a URL to an SVG that is the displayed svg on the side, a default
being a hashtag for a normal channel, and a [HAVENT DECIDED YET] for a meme/video channel.

The channelPermissions document contains the link to the document in the
:ref:`Permissions<Permissions>` collection which contains the permissions
that different :ref:`Users<Users>` and :ref:`Roles<Roles>` have in that channel.


******************
Channels Reference
******************

TODO:// Finish this.

.. parsed-literal::

    channelName: String
    channelType: String
    channelParentID: Ref(Collection("Channels"), "[FaunaID]")
    channelIconURL: String
    channelOrderingPreference: Long
    channelPermissions: Ref(Collection("Permissions"), "[FaunaID]")

