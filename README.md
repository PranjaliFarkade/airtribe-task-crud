# airtribe-task-crud
{
	"info": {
		"_postman_id": "a68a8273-a08e-4dd1-b903-3c423f2e36b2",
		"name": "Airtribe",
		"description": "Task CRUD Operation",
		"schema": "https://schema.getpostman.com/json/collection/v2.0.0/collection.json",
		"_exporter_id": "12548746"
	},
	"item": [
		{
			"name": "TaskCRUD",
			"item": [
				{
					"name": "get all tasks",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:3000/tasks"
					},
					"response": []
				},
				{
					"name": "get task by Id",
					"request": {
						"method": "GET",
						"header": [],
						"url": "http://localhost:3000/tasks/1"
					},
					"response": []
				},
				{
					"name": "create task",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"title\": \"submit user task\",\n    \"description\": \"Create new project task and submit\",\n    \"completed\": true\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "http://localhost:3000/tasks"
					},
					"response": []
				},
				{
					"name": "update task",
					"request": {
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"title\": \"submit task one\",\n    \"description\": \"Create new project task and submit\",\n    \"completed\": true\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": "http://localhost:3000/tasks/18"
					},
					"response": []
				},
				{
					"name": "delete task",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": "http://localhost:3000/tasks/18"
					},
					"response": []
				}
			]
		}
	]
}
