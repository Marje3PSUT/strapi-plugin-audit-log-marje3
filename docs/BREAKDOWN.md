# Breakdown

## Log structure

Each log entry contains the following:

```javascript
{
    user : "", // Authenticated users email or 'Anonymous' if not found.
    url: "", // Endpoint that the user sent a request to. ex: '/admin/login'
    ip_address: "", // IP address of the user.
    http_method: "", // HTTP method of the request that the user sent
    http_status: "", // HTTP status of the response strapi will send to the user. ex: 200 means that the operation was successful
    request_body: {}, // Contains the body of the request send by the user
    response_body: {} // Contains the body of the response that strapi will send to the user
}
```

## Implementation

### Folder Structure

- `admin`: This folder holds the frontend code.
- `server`: This folder contains the backend code.

### Backend

#### Content-Type Creation

A new content-type named `log` is created using the `strapi generate` command, with the following components:

- Route: defines a route to fetch logs according to permissions
- Controller: handles queries and redirects
- Service: returns a paginated result of logs

#### Middleware: intercept-request.js

The `intercept-request.js` middleware is crafted to enhance request handling. It operates in the following manner:

1. Intercepts incoming requests.
2. Processes these requests.
3. Creates an entry in the `log` collection utilizing data extracted from both the request and the resulting response using the plugin configuration.

This middleware is automatically registered globally in `register.js`.

#### Permissions Management

To ensure secure functioning, the necessary permissions for the plugin are generated and applied in the `bootstrap.js` file. These permissions are subsequently associated with specific routes through the use of the `admin::hasPermission` policy.

#### Custom Router and Controller

A custom router and controller `log-settings` is created to allow users to read and update plugin settings from the frontend using HTTP requests. They also handle validation for user submitted plugin settings using `yup`.

#### Cron task and custom Service

A cron task and service `delete-log` are created to handle deletion of records according to plugin settings. The plugin settings are as follows:

```javascript
{
    enabled: false, // True / False
    frequency: "", // "logAge" / "logCount"
    logAge: {
        value: 0, // Number of day(s)/week(s)...
        interval: "" // day / week / month / year
    },
    logCount: {
        value: 0, // Number of logs to keep
    }
}
```

The cron task executes once daily. It calls the `deleteJob()` function from the service `delete-log`, which checks the plugin settings and deletes the logs accordingly. Currently, the settings can only be changed within the frontend.

The settings are stored using `strapi.config`. The default settings can be set using the configuration shown in the `README.md` file.
