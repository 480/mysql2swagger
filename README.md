mysql2swagger
==========

<!-- Description Start -->
<a name="description"></a>
Generate Swagger v2 Specification JSON schema from mysql tables.
This is forked and refactoring from https://github.com/okunishinishi/node-mysqlspec
<!-- Description End -->

<a name="section-docs-readme-01-installation-md"></a>
Installation
-----

```bash
npm install https://github.com/480/mysql2swagger.git --save-dev
```

<a name="section-docs-readme-02-usage-md"></a>
Usage
-------

Describe database data.

```Javascript
var mysql2swagger = require('mysql2swagger');

// Mysql connect config.
var config = {
    user: 'root',
    password: 'my_password',
    host: 'localhost',
    database: 'my_db'
};
// Get spec for connected database
mysql2swagger(config, "DatabaseName", "TableName", function (err, schema) {
    console.log(JSON.stringify(schema, null, 4));
});
```

<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [MIT License](https://github.com/okunishinishi/node-mysqlspec/blob/master/LICENSE).

<!-- LICENSE End -->


<!-- Links Start -->
<a name="links"></a>

Links
------

+ [node-mysql](https://github.com/felixge/node-mysql/)
+ [node-mysqldesc](https://github.com/okunishinishi/node-mysqldesc)
+ [json-schema](http://json-schema.org/)

<!-- Links End -->
