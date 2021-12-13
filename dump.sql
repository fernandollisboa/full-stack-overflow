CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	"class" TEXT NOT NULL,
	"token" TEXT NOT NULL UNIQUE,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "questions" (
	"id" serial NOT NULL,
	"question" TEXT NOT NULL,
	"student_name" TEXT NOT NULL,
	"class" TEXT NOT NULL,
	"tags" TEXT NOT NULL,
	"submitAt" DATE NOT NULL,
	"answered" bool NOT NULL DEFAULT 'FALSE',
	"answeredAt" DATE,
	"answeredBy" TEXT,
	CONSTRAINT "questions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "questions" ADD CONSTRAINT "questions_fk0" FOREIGN KEY ("student_name") REFERENCES "users"("name");
ALTER TABLE "questions" ADD CONSTRAINT "questions_fk1" FOREIGN KEY ("answeredBy") REFERENCES "users"("name");


