import { NextRequest } from "next/server";
import puppeteer from "puppeteer";
import { verifyJwtToken } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: "new",
    });

    const reqBody = await request.json();
    const { rollNumber, password } = reqBody;

    // Authenticate the user if needed using verifyJwtToken
    const token = request.cookies.get("token")?.value || "";
    const user = await verifyJwtToken(token);

    const userExists = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    const page = await browser.newPage();
    await page.goto(
      "https://www.lordsautomation.com/StudentLogin/MainStud.aspx",
      {
        waitUntil: "networkidle0",
      }
    );

    // Wait for the username input field to appear
    await page.waitForSelector("#txtUserName", { visible: true });

    // Fill in the username field
    await page.type("#txtUserName", JSON.stringify(rollNumber));

    // Click the 'Next' button
    await Promise.all([page.waitForNavigation(), page.click("#btnNext")]);

    // Wait for the password input field to appear
    await page.waitForSelector("#txtPassword", { visible: true });

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
