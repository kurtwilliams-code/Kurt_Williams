Feature: Add admin user and verify

  Scenario: User should be added successfully
            Given User is able to access orangeHMR
            And User logs in to orangeHRM
            When User navigates to admin page
            And New user is added successfully
            And New user search functionality is verified
            Then New user details are identified
            When New user is deleted