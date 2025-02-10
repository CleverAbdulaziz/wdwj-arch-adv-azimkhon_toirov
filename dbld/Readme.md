Database Design for a Web Application
This repository contains the database layer design for a web application. The design was created to meet specific requirements by identifying all key, weak, and associative entities, defining relationships with precise cardinality and ordinality, and clearly specifying the attributes for each entity.

Overview
The database design forms the core of the application and is based on the following steps:

Entity Identification:
At least five unique entities have been created with meaningful names. These include:

Users: Represents the application’s users.
Posts: Represents content created by users.
Comments: Represents comments on posts.
Follows: An associative (weak) entity capturing the many-to-many "follow" relationship between users.
Likes: An associative (weak) entity that records which users "like" which posts.
Relationship Definition:
Relationships between these entities are defined with the correct cardinality:

Users ↔ Posts: One-to-Many (one user can author many posts).
Posts ↔ Comments: One-to-Many (each post can have many comments).
Users ↔ Comments: One-to-Many (a user can write many comments).
Users ↔ Follows: Many-to-Many via the Follows table.
Users and Posts ↔ Likes: Many-to-Many via the Likes table.
Attribute Specification:
Each entity has clearly defined attributes:

Primary Keys: Unique identifiers for strong entities (e.g., id in Users, Posts, and Comments).
Composite Keys: Used in associative entities (Follows and Likes) to uniquely identify a record by combining foreign keys.
Foreign Keys: Ensure referential integrity (e.g., user_id in Posts, post_id and user_id in Comments).
Other Attributes: Meaningful names such as username, email, title, body, and timestamps (created_at).
Architectural Pattern:
The chosen architectural pattern for building the web application is Model-View-Controller (MVC).

Model: Represents the database layer (designed using DBML in this repository).
View: Responsible for rendering the user interface.
Controller: Handles the business logic and acts as the intermediary between the Model and the View.
Explanation
Entities:
The design includes five distinct entities with descriptive names. Users, Posts, and Comments are strong entities with independent primary keys. Follows and Likes are associative (weak) entities that utilize composite keys (consisting of foreign keys) to capture many-to-many relationships.

Relationships:
Relationships between entities are depicted correctly:

Each post is linked to one user.
Each comment is linked to a post and a user.
The Follows table represents the many-to-many relationship between users by referencing the same entity twice (using unique names for each reference).
Similarly, the Likes table captures the many-to-many relationship between users and posts.
Attributes:
Attributes are clearly defined with:

Primary Keys: id for strong entities.
Composite Keys: Defined using indexes in associative entities.
Foreign Keys: Ensure relational integrity.
Other Attributes: Such as username, email, title, and created_at which are self-explanatory.
Architectural Pattern (MVC):
The MVC pattern is ideal for this web application as it clearly separates data (Model), presentation (View), and control logic (Controller), making the system more maintainable and scalable.