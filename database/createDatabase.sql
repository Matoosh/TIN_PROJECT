-- tables
-- Table: Accounts
CREATE TABLE Accounts (
    id int  NOT NULL,
    login varchar(50)  NOT NULL,
    password text  NOT NULL,
    email varchar(150)  NOT NULL,
    registerdate date  NOT NULL,
    role varchar(150)  NOT NULL,
    CONSTRAINT Accounts_pk PRIMARY KEY (id)
);

-- Table: Author
CREATE TABLE Authors (
    id int  NOT NULL,
    first_name varchar(50)  NOT NULL,
    last_name varchar(250)  NOT NULL,
    birth date  NOT NULL,
    imglink text  NULL,
    CONSTRAINT Authors_pk PRIMARY KEY (id)
);

-- Table: Books
CREATE TABLE Books (
    id int  NOT NULL,
    title varchar(255)  NOT NULL,
    description text  NOT NULL,
    releasedate date  NULL,
    status varchar(3)  NULL,
    imglink text  NULL,
    author_id int  NOT NULL,
    CONSTRAINT Books_pk PRIMARY KEY (id)
);

-- Table: Comment
CREATE TABLE Comments (
    id int  NOT NULL,
    comment text  NOT NULL,
    created date  NOT NULL,
    account_id int  NOT NULL,
    book_id int  NOT NULL,
    CONSTRAINT Comments_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: Bookss_Authors (table: Books)
ALTER TABLE Books ADD CONSTRAINT Bookss_Authors
    FOREIGN KEY (author_id)
    REFERENCES Authors (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: Comments_Bookss (table: Comments)
ALTER TABLE Comments ADD CONSTRAINT Comments_Books
    FOREIGN KEY (book_id)
    REFERENCES Books (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- Reference: Commentss_Users (table: Comments)
ALTER TABLE Comments ADD CONSTRAINT Comments_Accounts
    FOREIGN KEY (account_id)
    REFERENCES Accounts (id)
    NOT DEFERRABLE
    INITIALLY IMMEDIATE
;

-- End of file.

