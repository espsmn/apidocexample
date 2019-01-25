var express = require('express');
var router = express.Router();

let tasks = [{
  "id": 1,
  "title": "drink some beer"
}]

/**
 @api {get} /tasks List all tasks
 * @apiGroup Tasks
 * @apiSuccess {Object[]} tasks Task's list
 * @apiSuccess {Number} tasks.id Task id
 * @apiSuccess {String} tasks.title Task title
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "id": 1,
 *      "title": "drink some beer"
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/tasks', function(req, res) {  
  res.send(tasks)
});

/**
 * @api {get} /tasks/:id Find a task
 * @apiGroup Tasks
 * @apiParam {id} id Task id
 * @apiSuccess {Number} id Task id
 * @apiSuccess {String} title Task title
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "title": "drink some beer"
 *    }
 * @apiErrorExample {json} Task not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/tasks/:id', function(req, res) {  
  res.send(tasks[req.params.id - 1] || {"error": 'There is no task for this id, sorry brudda'})
});

/**
 * @api {post} /tasks Register a new task
 * @apiGroup Tasks
 * @apiParam {String} title Task title
 * @apiParamExample {json} Input
 *    {
 *      "title": "Get some pizza"
 *    }
 * @apiSuccess {Number} id Task id
 * @apiSuccess {String} title Task title
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 2,
 *      "title": "Get some pizza"
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/tasks', function(req, res) {  
  const task = {
    id: tasks.length + 1,
    title: req.body.title
  }
  tasks.push(task)
  res.send(task)
});

/**
 * @api {put} /tasks/:id Update a task
 * @apiGroup Tasks
 * @apiParam {id} id Task id
 * @apiParam {String} title Task title
 * @apiParamExample {json} Input
 *    {
 *      "title": "Coding"
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 * @apiErrorExample {json} Update error
 *    HTTP/1.1 500 Internal Server Error
 */
router.put('/tasks/:id', function(req, res) {  
  tasks[req.params.id - 1].title = req.body.title
  res.end()
});

/**
 * @api {delete} /tasks/:id Remove a task
 * @apiGroup Tasks
 * @apiParam {id} id Task id
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 * @apiErrorExample {json} Delete error
 *    HTTP/1.1 500 Internal Server Error
 */
router.delete('/tasks/:id', function(req, res) {
  tasks = tasks.filter(task => task.id != req.params.id)
  Promise.all(tasks.map((task, index) => {
    if (index + 1 < task.id) {
      task.id--
    }
  })).then(() =>
    res.end()
  )
});

module.exports = router;
