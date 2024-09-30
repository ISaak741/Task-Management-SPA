<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    @vite('resources/js/index.js')
    <title>Task SPA Management</title>
</head>

<body>
    <nav>
        <a href="/" link>home</a> <a href="/users" link>users</a>
    </nav>
    <main main-app></main>
</body>

</html>
