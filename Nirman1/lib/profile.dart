import 'package:flutter/material.dart';
import 'constants/color_constants.dart';

import 'dart:math';

class profileinfo extends StatefulWidget {
  const profileinfo({super.key});

  @override
  State<profileinfo> createState() => _profileinfoState();
}

class _profileinfoState extends State<profileinfo> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xff1C1B1F),
      body: Padding(
        padding: const EdgeInsets.only(top: 72.0, left: 32, right: 32),
        child: Column(
          children: [
            Container(
              width: 366,
              height: 72,
              child: Row(
                // ignore: prefer_const_literals_to_create_immutables
                children: [
                  Text(
                    'Personal Info',
                    style: TextStyle(
                        fontSize: 16,
                        fontFamily: 'Inter',
                        fontWeight: FontWeight.w500,
                        color: Gcolors.primaryColor050),
                  ),
                  SizedBox(
                    width: 180 - 25,
                  ),
                  Icon(
                    Icons.edit_square,
                    color: Gcolors.primaryColor400,
                    size: 20,
                  ),
                  Text(
                    'Edit',
                    style: TextStyle(
                        fontSize: 14,
                        fontFamily: 'Inter',
                        fontWeight: FontWeight.w500,
                        color: Gcolors.primaryColor400),
                  )
                ],
              ),
            ),
            Container(
              width: 366,
              height: 116,
              decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(16),
                  color: Gcolors.neutralColor900),
              child: Padding(
                padding: const EdgeInsets.only(left: 16.0),
                child: Column(
                  children: [
                    SizedBox(
                      height: 16,
                    ),
                    Row(
                      children: [
                        Icon(
                          Icons.person_rounded,
                          color: Gcolors.primaryColor050,
                        ),
                        SizedBox(
                          width: 8,
                        ),
                        Text(
                          'Abhinaba Dash',
                          style: TextStyle(
                              fontSize: 14,
                              fontFamily: 'Inter',
                              fontWeight: FontWeight.normal,
                              color: Gcolors.primaryColor050),
                        )
                      ],
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    Row(
                      children: [
                        Icon(
                          Icons.phone_outlined,
                          color: Gcolors.primaryColor050,
                        ),
                        SizedBox(
                          width: 8,
                        ),
                        Text(
                          '9876543210',
                          style: TextStyle(
                              fontSize: 14,
                              fontFamily: 'Inter',
                              fontWeight: FontWeight.normal,
                              color: Gcolors.primaryColor050),
                        )
                      ],
                    ),
                    SizedBox(
                      height: 8,
                    ),
                    Row(children: [
                      Icon(
                        Icons.email_outlined,
                        color: Gcolors.primaryColor050,
                      ),
                      SizedBox(
                        width: 8,
                      ),
                      Text(
                        'abhinabadash@gmail.com',
                        style: TextStyle(
                            fontSize: 14,
                            fontFamily: 'Inter',
                            fontWeight: FontWeight.normal,
                            color: Gcolors.primaryColor050),
                      )
                    ])
                  ],
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
