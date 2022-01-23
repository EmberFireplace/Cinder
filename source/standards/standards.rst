================
Coding Standards
================

------------------
Naming Conventions
------------------

##################
Descriptive Naming
##################

    Attempt to err on the side of being more verbose when naming things, verbose naming can allow you to be more descriptive.
    Being able to understand what a variable or function is doing just by reading it should be the standard.
    Comments are for why the code does this, not what it does unless necessary.

.. warning::
    Descriptive names for functions, events, props, and variables should not be tensed in any way other than the infinitive
    this means do NOT include **ed**\ , **ing** or any other forms of tensing in your names for things.
    I.E. use *'channelClick'* NOT *'channelClicked'* or *'channelClicking'*

######
Casing
######

Sticking with the convention of Javascript and Java, and also personally because it is in my opinon the most readable
you must use camelCase for variables and functions, UpperCamelCase for Svelte Components and Classes.
You also should use full uppercase on acronyms when possible. So `userID` would be correct while `userId` would not.


.. note::

    TODO://Add other casing standards later.





------
Svelte
------

######
Events
######

When declaring functions for Events we have a function, a event name, and prop variable combos to bubble the event down.


********
Function
********

The function name for events is prepended with send and postpended with Event

.. parsed-literal::

    <div on:\ *triggeringEvent*\ ={() => send\ :ref:`DescriptiveName<Descriptive Naming>`\ Event()}</div>

**********
Event Name
**********
The event name should be just the :ref:`descriptiveName<Descriptive Naming>`


************************************
Bubble Down Prop Variables (Parents)
************************************

Bubble down props in the parent svelte class should be named :

.. parsed-literal::

    callWhen\ :ref:`DescriptiveName<Descriptive Naming>`

An example of this is in the Parent svelte class under ServerView folder:

.. code-block:: javascript

    let callWhenServerIconClick;


.. code-block:: html

    <ServerSidebar on:serverIconClick={callWhenServerIconClick}>
    <ChannelSidebar bind:onServerIconClick{callWhenServerIconClick}>



*************************************
Bubble Down Prop Variables (Children)
*************************************

Bubble down props in the child classes which are variables assocaited with lambda functions should be named :

.. parsed-literal::

    on\ :ref:`DescriptiveName<Descriptive Naming>`

An example of this is in the ChannelSidebar class under the ServerView folder:

.. code-block:: javascript

    export let onServerIconClick = (event) => {
        //lots of fancy code...
    }



