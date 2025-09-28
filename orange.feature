Feature: Login test of orangeHMR

  Scenario: Login should be success
            Given User is able to access orangeHMR
            And User enter the username as "Admin"
            And User enter the password as "admin123"
            When User click on the login button
            Then Login should be success
            When User logs out
            And User enters invalid credentials
            Then Error message verified successfully
            When User logs back in