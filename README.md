# Pomodoro Timer App
## Introduction

This project is  a Pomodoro Timer web application using Vue.js 3 and Node.js.<br><br>
The basic function of this app is Pomorodo technology. The timer is initially set to 25 minutes. A 5-minute break begins when the timer runs out. Breaks should be 15 minutes instead of every four work sessions. Set the number of work sessions for work hours, short breaks, long breaks, and long breaks in the settings window.<br><br>
There are sound notifications when a work session ends and a break begins, and vice versa.<br><br>
This project implements PWA (Progressive Web Application), so all functions of the program operate even when the network is disconnected, and all information of the app is stored in synchronization with the data base of the service machine.


## Docker Setting

### Environment Variables
1. Database Variables
  - Environment<br>
    POSTGRES_USER : POSTGRES Database Username<br>
    POSTGRES_PASSWORD: POSTGRES Database password<br>
    POSTGRES_DB: POSTGRES Database name<br>
  - Ports<br>
    { PUBLIC PORT NUMBER } : { PRIVATE PORT NUMBER }<br>
2. Server Variables
  - Environment<br>
    DB_HOST: Database's host address<br>
    DB_PORT: Database's port<br>
    DB_USER: Username used to access the database<br>
    DB_PASSWORD: Database's password<br>
    DB_NAME: Database name to connect<br>
    PORT: Sever's Private Port number<br>
  - Ports<br>
    { PUBLIC PORT NUMBER } : { PRIVATE PORT NUMBER }<br>
    
### Runnig Command

This project can be run simply by using the following command.<br>

```
docker compose up
```

## Testing

Check out the results from the this link:
<a>https://pomodoro-production-edbf.up.railway.app/</a>

## Further Development Suggestions

There are some suggestions for further development of the Pomodoro Timer web application.<br><br>

1. <b>Task Management:</b> Add task management features, allowing users to add and manage tasks with deadlines along with Pomodoro timer.
2. <b>Progress Visualization:</b> Provide users with visualizations such as graphs, charts, or progress bars that display statistics of their completed pomodoros, tasks, and time spent on a particular activity.
3. <b>Customizable Timer Settings:</b> Allow users to customize the length and number of work sessions and breaks, along with the option to save and switch between different pre-set timer configurations.
4. <b>Pomodoro Ideas:</b> Offer users ideas for activities they can do during their break sessions, such as taking a walk, stretching, meditating, or reading.
5. <b>Personalization:</b> Add personalization options, including themes, colors, and fonts, to allow users to create a more personalized experience.<br>Implement user profiles where users can save their personal preferences, settings and track their overall progress.
7. <b>Multi-Language Support:</b> Add support for multiple languages to attract users worldwide.
8. <b>Integration with other tools:</b> Integrate the Pomodoro timer with other productivity tools such as calendars, to-do lists, project management tools, and note-taking apps.
9. <b>Mobile App Development:</b> Consider building a mobile application version of the Pomodoro timer so that users can also use it on their mobile devices.
<br>
I think that these are just a few ideas to improve the functionality, usability, and engagement of your Pomodoro Timer web application.



