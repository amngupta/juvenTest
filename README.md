## The Task

Build a single-page web app with an “Admin Profile Page” for each Organization
intended for the admins of the Organization to use, with the following components:

1. Profile Cover section: Displaying the cover and profile images, name, creation date
and location of an Organization (see the Profile Cover on the top part of Appendix 1,
but ignore the “members / admirers” metrics and navigation bar)

2. Events section: Displaying a list of events with their information including name,
location, date, price and the image of the event (see Events section of Appendix 1
and style it similarly, but it should be a full-width section). Also:
    - add a toggle on the top of the section to choose which column to sort by
    - display a list of Users joining the Event (“Guests”) in a popup modal when you
click on the Event row

3. Add Guests section: Allowing the admin to add any User belonging to the
Organization to any Event belonging to the Organization (making them Guests of
the Event). You can design the layout of the section yourself, but a reasonable UI
would be:
   - two dropdown menus, for Organization Events and Organization Users
   - an “Add” button to send the AJAX request to add the User to the Event
   - as you select an Event from the Events menu, the Users who are already Guests
should be excluded from the dropdown

## The Datastructure 

Our Data Structure
In our system, we will have three types of objects to be stored - Organizations, Events
and Users.

An Organization:
- has the fields: id, name, description, created_at, location, profile_image_url &
cover_image_url
- has many Events
- has many Users

An Event:
- has the fields: id, name, date, location, price & image_url
- belongs to an Organization
- has many Users

A User:
- has the fields: id, name, email & image_url
- belongs to many Organizations
- belongs to many Events

## Scripts
- Deploy Database: A JSON instance of the database is stored in Database.json and is deployed 
to the Firebase Realtime Database using the `yarn deploy-db` command
- Start App: Used `create-react-app` to make the application so a test instance
of the application can be started by running `yarn start`

## Retrospective
To make the code as modular as possible, most react components are seprate classes. 
Moreover, I have tried to keep the methods as simple as short and simple as possible.
However, with more time, I would have coded the task very differntly. I would have preferred
using MongoDB as my database and also created a server to query the Database since MongoDB can handle 
more powerful and complex queries. 

I would have spent more time working on the CSS for the application especially to translate the more 
complex design patterns in the appendix onto my submission. 