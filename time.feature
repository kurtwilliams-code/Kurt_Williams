Feature: Verify timesheet can be submitted

  Scenario: Timesheet is submited successfully
            Given User is able to access orangeHMR
            And User logs in to orangeHRM
            When User navigates to time, searches for employee
            And User creates timetsheet and edits it
            Then User views newly created timesheet