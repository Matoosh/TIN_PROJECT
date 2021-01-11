-- tables
-- Table: Account
CREATE TABLE Account (
    id int  NOT NULL,
    login varchar(50)  NOT NULL,
    password text  NOT NULL,
    email varchar(150)  NOT NULL,
    registerdate date  NOT NULL,
    role varchar(150)  NOT NULL,
    CONSTRAINT Account_pk PRIMARY KEY (id)
);

-- Table: Author
CREATE TABLE Author (
    id int  NOT NULL,
    first_name varchar(50)  NOT NULL,
    last_name varchar(250)  NOT NULL,
    birth date  NOT NULL,
    imglink text  NULL,
    CONSTRAINT Author_pk PRIMARY KEY (id)
);

-- Table: Book
CREATE TABLE Book (
    id int  NOT NULL,
    title varchar(255)  NOT NULL,
    description text  NOT NULL,
    releasedate date  NULL,
    status varchar(3)  NULL,
    imglink text  NULL,
    author_id int  NOT NULL,
    CONSTRAINT Book_pk PRIMARY KEY (id)
);

-- Table: Comment
CREATE TABLE Comment (
    id int  NOT NULL,
    comment text  NOT NULL,
    created date  NOT NULL,
    account_id int  NOT NULL,
    book_id int  NOT NULL,
    CONSTRAINT Comment_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: Books_Authors (table: Book)
ALTER TABLE Book ADD CONSTRAINT Books_Authors
    FOREIGN KEY (author_id)
    REFERENCES Author (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: Comments_Books (table: Comment)
ALTER TABLE Comment ADD CONSTRAINT Comments_Books
    FOREIGN KEY (book_id)
    REFERENCES Book (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: Comments_Users (table: Comment)
ALTER TABLE Comment ADD CONSTRAINT Comments_Users
    FOREIGN KEY (account_id)
    REFERENCES Account (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- End of file.

