<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Penda Graphics - Admin Dashboard</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/css/app.css', 'resources/js/admin.js'])
</head>
<body>
    <div id="app">
    <dashboard-layout></dashboard-layout>
    </div>
</body>
</html>
