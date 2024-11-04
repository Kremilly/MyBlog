---
Title: DumpSync
Category: Crate
Description: A simple tool for dump and restore a MySQL database. It can be used for backup and restore purposes, or for transferring a database from one server to another.
Package: cargo install dumpsync
---
A simple tool for dump and restore a MySQL database. It can be used for backup and restore purposes, or for transferring a database from one server to another.

## Overview

This tool allows for automatic dumps of a MySQL database at configurable time intervals, saving the files in a specified directory. Configuration can be done via environment variables or command-line arguments, providing flexibility for different usage contexts.

To Install using [crates.io](https://crates.io):

> [!install] cargo install dumpsync

### Parameters

The tool uses three main parameters, which can be configured via arguments or environment variables.

1. **Database Name (`dbname`)** The name of the database to be dumped. This parameter is required for the dump to execute successfully.

   - **Command-Line Argument**: `--database`
   - **Environment Variable**: `DB_NAME`
   - **Behavior**: If the `--database` argument is provided, it will be used. Otherwise, the `DB_NAME` environment variable will be used.
2. **Dump Interval (`interval`)** Time interval, in seconds, between each database dump. This parameter defines the frequency of automatic backups.

   - **Command-Line Argument**: `--interval`
   - **Environment Variable**: `DS_DUMP_INTERVAL`
   - **Behavior**: If the `--interval` argument is provided, it will be used. Otherwise, the `DS_DUMP_INTERVAL` environment variable will be used.
3. **Backup Path (`backup_path`)** Directory where dump files will be saved. You can specify a local or remote folder as needed.

   - **Command-Line Argument**: `--folder`
   - **Environment Variable**: `DS_DUMP_PATH`
   - **Behavior**: If the `--folder` argument is provided, it will be used. Otherwise, the `DS_DUMP_PATH` environment variable will be used.
4. **Database Host (`db_host`)**: The address of the database host.

   - **Environment Variable**: `DB_HOST`

5. **Database Port (`db_port`)**: The port number of the database.

   - **Environment Variable**: `DB_PORT`

### Usage Example

**To make a dump, use like this:**:

```bash
dumpsync export -d my_database -i 3600 -f /path/to/
```

**To restore a dump, use like this**:

```bash
dumpsync import -f /path/to/dump.sql
```

**Environment Variables**:

```bash
DB_HOST="YOUR_HOST"
DB_PORT="YOUR_PORT"
DB_USER="YOUR_USERNAME"
DB_PASSWORD="YOUR_PASSWORD"
DB_NAME="YOUR_DATABASE"

DS_DUMP_INTERVAL="3600"
DS_DUMP_PATH="/path/to/"

# OR

DS_DB_HOST="YOUR_HOST"
DS_DB_PORT="YOUR_PORT"
DS_DB_USER="YOUR_USERNAME"
DS_DB_PASSWORD="YOUR_PASSWORD"
DS_DB_NAME="YOUR_DATABASE"

DS_DUMP_INTERVAL="3600"
DS_DUMP_PATH="/path/to/"
```

**Optional settings file**:

<script src="https://gist.github.com/Kremilly/0189fecf4fe7d1b86f35beb8e14f6091.js"></script>

> [!important] Save as `dumpsync.yaml` to the same directory where your project is running.

### Notes

- The tool requires read and write permissions in the directory set for `backup_path`.
- The MySQL database must be accessible for the dump to proceed.
- It is recommended to test the initial configuration to ensure that parameters are correct and the backup executes as expected.
