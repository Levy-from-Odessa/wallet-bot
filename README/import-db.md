To copy the content of a local SQLite file and paste it into a file on a remote SSH server, you can use a combination of SQLite command-line tools and SSH. Here's a step-by-step guide on how to do this:

Locally Dump the SQLite Database:
Use the sqlite3 command-line tool to create a SQL dump of the SQLite database to a local file. You can use the following command to do this:

```sh
  sqlite3 /path/to/local/database.sqlite .dump > local_dump.sql
```
Replace /path/to/local/database.sqlite with the path to your SQLite database, and local_dump.sql with the desired name for the SQL dump file.

Transfer the SQL Dump to the Remote Server:
You can use scp or any other file transfer method to copy the SQL dump file to the remote SSH server. For example, if you're using scp:

```sh
scp local_dump.sql user@remote_server:/path/to/remote/
```

Replace local_dump.sql with the name of the SQL dump file, user with your remote server's username, remote_server with the SSH server's hostname or IP address, and /path/to/remote/ with the destination path on the remote server.

SSH into the Remote Server:
Use the ssh command to log into your remote server:

```sh
ssh user@remote_server
```
Replace user and remote_server with your SSH server details.

Import the SQL Dump on the Remote Server:
On the remote server, you can use the sqlite3 command-line tool to import the SQL dump into a new or existing SQLite database:

```sh
sqlite3 /path/to/remote/database.sqlite < /path/to/remote/local_dump.sql
```

Replace /path/to/remote/database.sqlite with the path to your remote SQLite database and /path/to/remote/local_dump.sql with the path to the SQL dump file.

Now, the content from your local SQLite database should be copied and pasted into the remote SQLite database.