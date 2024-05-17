export const options:any={
    definition:{
        openapi:"3.0.0",
        info:{
            title: "Attendance management system",
            version: "1.0.0"
        },
        servers:[
            {
                url:"http://localhost:8000"
            }
        ]
    },
    apis:["../Routes/*.ts"]
}