========
UserAuth
========

-----
About
-----

The UserAuth.ts file has one purpose, it handles the creation, logging in, and logging out
of user accounts.

###############
universalClient
###############

The UniversalClient is a client created with a universal token that everyone has public access too.
This token is given the specific permissions to `Write <https://docs.fauna.com/fauna/current/security/permissions>`_ to the :ref:`Users<Users>` `Collection <https://docs.fauna.com/fauna/current/learn/understanding/collections>`_
and to read from the :ref:`UsersByEmail<UsersByEmail>` Index.
