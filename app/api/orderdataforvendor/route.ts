import { prisma } from "@/prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import moment from "moment";
import { z } from "zod";

const schema = z.object({
  filter: z.string(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = schema.safeParse(body);

  const today = moment();
  const oneYearAgo = moment().subtract(1, "years").toDate();
  const oneMonthAgo = moment().subtract(1, "months").toDate();
  const oneWeekAgo = moment().subtract(1, "weeks").toDate();

  //   console.log("One year ago:", oneYearAgo.toJSON());
  //   console.log("One month ago:", oneMonthAgo.toJSON());
  //   console.log("One week ago:", oneWeekAgo.toJSON());

  const token = await getToken({ req: req });
  if (!token)
    return NextResponse.json(
      { message: "Sorry lad you are not logged in" },
      { status: 400 }
    );
  let allData: any = [];

  if (body.filter === "month") {
    allData = await prisma.orderstable.findMany({
      where: {
        orderedat: {
          gte: oneMonthAgo,
        },
      },
    });
  } else if (body.filter === "week") {
    allData = await prisma.orderstable.findMany({
      where: {
        orderedat: {
          gte: oneWeekAgo,
        },
      },
    });
  } else if (body.filter === "year") {
    allData = await prisma.orderstable.findMany({
      where: {
        orderedat: {
          gte: oneYearAgo,
        },
      },
    });
  } else if (body.filter === ''){
    allData = await prisma.orderstable.findMany();
  }
  console.log(allData);
  return NextResponse.json({ data: allData }, { status: 200 });
}
