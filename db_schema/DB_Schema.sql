CREATE TABLE Users
(
	Id INT PRIMARY KEY,
    UserName VARCHAR(50) NOT NULL,
    Password VARCHAR(255) NULL,
    IsDisabled BIT(1) NOT NULL DEFAULT(0)
);

CREATE TABLE QuestionnaireTypes
(
	Id INT PRIMARY KEY,
    Name VARCHAR(50) NOT NULL
);

CREATE TABLE Questionnaires
(
	Id INT PRIMARY KEY,
    UserId INT NOT NULL,
    TypeId INT NOT NULL,
    Timestamp TIMESTAMP NOT NULL,
    Answers JSON NOT NULL,
    CONSTRAINT FK_Questionnaires_User_Id FOREIGN KEY (UserId) REFERENCES Users(Id),
    CONSTRAINT FK_Questionnaires_Type_Id FOREIGN KEY (TypeId) REFERENCES QuestionnaireTypes(Id)
);

CREATE TABLE RecordingTaskTypes
(
	Id INT PRIMARY KEY,
    Name VARCHAR(50)  NOT NULL
);

CREATE TABLE RecordingTaskSentences
(
	Id INT PRIMARY KEY,
    Text VARCHAR(1000)  NOT NULL
);

CREATE TABLE RecordingTaskImages
(
	Id INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Hash VARCHAR(80) NULL,
    ImageFileId BINARY(16) NOT NULL
);

CREATE TABLE RecordingTasks
(
	Id INT PRIMARY KEY,
    Timestamp TIMESTAMP NOT NULL,
    UserId INT NOT NULL,
    TypeId INT NOT NULL,
    RecordingFileId BINARY(16) NOT NULL,
    SentenceId INT NULL,
    ImageId INT NULL,
    CONSTRAINT FK_RecordingTasks_User_Id FOREIGN KEY (UserId) REFERENCES Users(Id),
    CONSTRAINT FK_RecordingTasks_Type_Id FOREIGN KEY (TypeId) REFERENCES RecordingTaskTypes(Id),
    CONSTRAINT FK_RecordingTasks_Sentence_Id FOREIGN KEY(SentenceId) REFERENCES RecordingTaskSentences(Id),
    CONSTRAINT FK_RecordingTasks_Image_Id FOREIGN KEY(ImageId) REFERENCES RecordingTaskImages(Id)
);

CREATE TABLE VersionHistory
(
	Id INT PRIMARY KEY,
    VersionNumber varchar(20) NOT NULL,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);