===========
Permissions
===========
----------
UNFINISHED
----------

This is a work in progress on hold until more things are implemented.

--------------------------
Global Revoked Permissions
--------------------------
No users will have the ability to read or write the document history, or have unrestricted access.

------------------------
Server Permissions Fauna
------------------------

########
Any User
########

Any user will have the permissions to CREATE a server document.

Any user will have the permissions to READ any server document.
This is because universally reading server documents will let anybody see the server image
and name of any server given its ID. Useful for links.

################
Individual Users
################

A user will have permissions to WRITE to a server document given a proper role in the actual server permissions determined by lambda function

A user will have permissions to WRITE to a server document if they are the owner of the server.

A user will have permissions to DELETE a server document if they are the owner of the server.


-------------------------
Channel Permissions Fauna
-------------------------


###############
Individual User
###############

A user will have permission to READ a Channel document if the Role they have allows them to read that channel.

A user will have permission to




