===============
Fauna Reference
===============

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

This collection contains the following variables:

.. parsed-literal::

    username
    email
    profileIconURL
    userBio


