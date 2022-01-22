################
Coding Standards
################

==================
Descriptive Naming
==================


.. _descriptiveName:

    Attempt to err on the side of being more verbose when naming things, verbose naming can allow you to be more descriptive.
    Being able to understand what a variable or function is doing just by reading it should be the standard.
    Comments are for why the code does this, not what it does unless necessary.

.. warning::
    Descriptive names for functions, events, props, and variables should not be tensed in any way other than the infinitive
    this means do NOT include **ed**\ , **ing** or any other forms of tensing in your names for things.
    I.E. use *'channelClick'* NOT *'channelClicked'* or *'channelClicking'*

======
Svelte
======

------
Events
------

When declaring functions for Events we have a function, a event name, and prop variable combos to bubble the event down.


^^^^^^^^
Function
^^^^^^^^
The function name for events is prepended with send and postpended with Event

.. parsed-literal::

    <div on:\ `triggeringEvent`\ ={() => send\ DescriptiveName_\ Event()}</div>

^^^^^^^^^^
Event Name
^^^^^^^^^^
The event name should be just the descriptiveName
