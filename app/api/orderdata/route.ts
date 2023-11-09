import { prisma } from "@/prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import moment from "moment";


export async function POST(req: NextRequest) {
  const body = await req.json();

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
  if (token.role === 'vendor'){
    if (body.filter === "month") {
      allData = await prisma.orderstable.findMany({
        where: {
          vendorid : parseInt(token.sub!),
          orderedat: {
            gte: oneMonthAgo,
          },
        },
      });
      console.log(allData)
    } else if (body.filter === "week") {
      allData = await prisma.orderstable.findMany({
        where: {
          vendorid : parseInt(token.sub!),
          orderedat: {
            gte: oneWeekAgo,
          },
        },
      });
    } else if (body.filter === "year") {
      allData = await prisma.orderstable.findMany({
        where: {
          vendorid : parseInt(token.sub!),
          orderedat: {
            gte: oneYearAgo,
          },
        },
      });
    } else if (body.filter === ''){
      allData = await prisma.orderstable.findMany({
        where: {vendorid : parseInt(token.sub!)}
      });
    }
}
  else if (token.role === 'user') {
    allData = await prisma.orderstable.findMany({
      where : {usertableId : parseInt(token.sub!) }
  })
}
 else if (token.role === 'admin') {
    allData = await prisma.orderstable.findMany()
 }
  console.log(allData);
  return NextResponse.json({ data: allData }, { status: 200 });
}
