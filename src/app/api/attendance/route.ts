import { NextRequest } from "next/server";
import { chromium } from "playwright-chromium";

export async function POST(request: NextRequest) {
  let browser;

  try {
    browser = await chromium.launch();

    const reqBody = await request.json();
    const { rollNumber, password } = reqBody;

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(
      "https://www.lordsautomation.com/StudentLogin/MainStud.aspx",
      {
        waitUntil: "networkidle",
      }
    );

    // Wait for the username input field to appear
    await page.waitForSelector("#txtUserName");

    // Fill in the username field
    await page.type("#txtUserName", rollNumber);

    // Click the 'Next' button
    await Promise.all([page.waitForNavigation(), page.click("#btnNext")]);

    // Wait for the password input field to appear
    await page.waitForSelector("#txtPassword");

    // Fill in the password field
    await page.type("#txtPassword", password);

    // Click the 'Submit' button
    await Promise.all([page.waitForNavigation(), page.click("#btnSubmit")]);

    // Check if a specific element indicating successful login is present
    const loggedInElement = await page.$("#ctl00_cpStud_PanelMainStud");

    if (loggedInElement) {
      // Extract the attendance percentage
      const attendanceElement = await page.$(
        "#ctl00_cpStud_lblTotalPercentage"
      );
      const attendancePercentage = attendanceElement
        ? await page.evaluate((el) => el.textContent, attendanceElement)
        : "Attendance data not found";

      // Send the attendance percentage as a JSON response
      return new Response(JSON.stringify({ attendancePercentage }), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      // Handle the case where the login was not successful
      console.log(rollNumber, password);

      return new Response("Authentication failed.", { status: 401 });
    }
  } catch (error) {
    // Handle and log any errors here
    console.error("An error occurred:", error);
    return new Response("An error occurred.", { status: 500 });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
