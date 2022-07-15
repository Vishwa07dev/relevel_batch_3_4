
db.createCollection("students", {
    validator: {
        $jsonSchema: {
            properties: {
                name: {
                    description: "string and is mandatory",
                    bsonType: "string"
                },
                year: {
                    description: "integer between [ 2017, 3017 ] and mandatory",
                    maximum: 3017,
                    bsonType: "int",
                    minimum: 2017,
                },
                major: {
                    description: "can only be one of the enum values and mandatory",
                    enum: ["Maths", "English", "Computer Science", "History", null
                    ]
                },
                gpa: {
                    bsonType: ["double"],
                    description: "double if the field exists"
                },
                address: {
                    bsonType: "object",
                    required: ["city"],
                    properties: {
                        street: {
                            bsonType: "string",
                            description: "string if the field exists"
                        },
                        city: {
                            bsonType: "string",
                            description: "string and mandatory"
                        }
                    }
                }
            },

            required: ["name", "year", "major", "address"],
            bsonType: "object"
        }
    }
});