=====
Fauna
=====

Fauna is Cinder's backend hybrid server.

---------
Variables
---------

####
User
####

******
UserID
******

All variables that are assigned the value from fauna of a user id is called userID.
UserID is the fauna assigned id of a user, and used for queries.

######
Server
######

A fauna document that abstractly contains users, channels, and thus messages.
It is the place where users interact.

********
ServerID
********

ServerID is the name of the variables that are used for the fauna assigned id of a server.
It can be used for queries.

#######
Channel
#######

Is the place where messages are abstractly held. Each user can have different perms for channels.
They can be renamed and moved around on in a server, but moving them around requires extra permissions
beyond the normal default user, and will update their positions for all users.

*********
ChannelID
*********
:ref:`See ServerID<ServerID>`


###############
Profile Picture
###############

Every user has a profile picture, and each message also has an associated profile picture.
Unlike username changes, when a user changed their profile, the profile of the messages
they sent previously persists. All profile pictures are just links to the images in a database.
