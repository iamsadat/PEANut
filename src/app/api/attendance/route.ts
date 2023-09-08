import { NextRequest } from "next/server";
import puppeteer from "puppeteer";
import { verifyJwtToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const reqBody = await request.json();
  const token = request.cookies.get("token")?.value || "";
  const user = await verifyJwtToken(token);

  const browser = await puppeteer.launch({
    headless: "new",
  });

  const page = await browser.newPage();
  await page.goto("https://www.lordsautomation.com/StudentLogin/MainStud.aspx");

  await page.waitForSelector("#txtUserName");
  await page.type("#txtUserName", reqBody.rollNumber);

  await Promise.all([page.waitForNavigation(), page.click("#btnNext")]);

  await page.waitForSelector("#txtPassword");
  await page.type("#txtPassword", reqBody.password);

  await Promise.all([page.waitForNavigation(), page.click("#btnSubmit")]);

  const attendanceElement = await page.$("#ctl00_cpStud_lblTotalPercentage");
  if (attendanceElement) {
    const attendancePercentage = await page.evaluate(
      (el) => el.textContent,
      attendanceElement
    );
    console.log("Attendance Percentage:", attendancePercentage);
    console.log("Login successful.");
  } else {
    console.log("Not on the home page. Authentication may have failed.");
  }

  await browser.close();
}
