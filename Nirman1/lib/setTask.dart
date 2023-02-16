import 'package:flutter/material.dart';
import 'package:flutter_application_1/constants/routes.dart';
import 'constants/color_constants.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:date_time_picker/date_time_picker.dart';
import 'package:flutter/cupertino.dart';

class Settask extends StatefulWidget {
  const Settask({super.key});

  @override
  State<Settask> createState() => _SettaskState();
}

class _SettaskState extends State<Settask> {
  TimeOfDay selectedTime = TimeOfDay.now();
  _selectTime(BuildContext context) async {
    final TimeOfDay? timeOfDay = await showTimePicker(
      context: context,
      initialTime: selectedTime,
      initialEntryMode: TimePickerEntryMode.dial,
    );
    if (timeOfDay != null && timeOfDay != selectedTime) {
      setState(() {
        selectedTime = timeOfDay;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: Container(
        color: Gcolors.neutralColor1000,
        child: Padding(
          padding: const EdgeInsets.only(left: 20, right: 32),
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.only(top: 91),
                child: Row(
                  children: [
                    //Image.asset('assets/images/backicon.png', height: 24, width: 24,),
                    IconButton(
                        onPressed: () {
                          Navigator.of(context).pushReplacementNamed(homeRoute);
                        },
                        icon: const Icon(
                          Icons.arrow_back,
                          color: Gcolors.primaryColor100,
                        ))
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(top: 60, left: 12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Padding(
                      padding: EdgeInsets.only(bottom: 12, left: 4),
                      child: Text(
                        'NEW PERSONAL TASK',
                        style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                            color: Gcolors.primaryColor050),
                      ),
                    ),
                    Container(
                      decoration: BoxDecoration(
                        color: Gcolors.neutralColor900,
                        borderRadius: BorderRadius.circular(16),
                      ),
                      height: 425,
                      width: 366,
                      child: Padding(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 16, vertical: 20),
                        child: Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              //Title
                              Row(
                                children: [
                                  const SizedBox(
                                    width: 16,
                                  ),
                                  Text(
                                    'Title',
                                    style: GoogleFonts.inter(
                                        textStyle: const TextStyle(
                                            color: Gcolors.primaryColor100,
                                            fontWeight: FontWeight.w600,
                                            fontSize: 16)),
                                  ),
                                ],
                              ),
                              Padding(
                                padding: const EdgeInsets.only(top: 8),
                                child: Container(
                                  height: 64,
                                  width: 334,
                                  decoration: BoxDecoration(
                                      shape: BoxShape.rectangle,
                                      borderRadius: BorderRadius.circular(16),
                                      border: Border.all(
                                          color: Gcolors.primaryColor100)),
                                  child: Padding(
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 16, vertical: 23),
                                    child: TextField(
                                      style: GoogleFonts.inter(
                                          textStyle: const TextStyle(
                                              color: Gcolors.primaryColor050,
                                              fontSize: 14)),
                                      decoration:
                                          const InputDecoration.collapsed(
                                              hintText: 'Add Title',
                                              hintStyle: TextStyle(
                                                  color:
                                                      Gcolors.neutralColor400)),
                                    ),
                                  ),
                                ),
                              ),
                              //description
                              Padding(
                                padding: const EdgeInsets.only(top: 24),
                                child: Row(
                                  children: [
                                    const SizedBox(
                                      width: 16,
                                    ),
                                    Text(
                                      'Description',
                                      style: GoogleFonts.inter(
                                          textStyle: const TextStyle(
                                              color: Gcolors.primaryColor100,
                                              fontWeight: FontWeight.w600,
                                              fontSize: 16)),
                                    ),
                                  ],
                                ),
                              ),
                              Padding(
                                padding: const EdgeInsets.only(top: 8),
                                child: Container(
                                  height: 128,
                                  width: 334,
                                  decoration: BoxDecoration(
                                      shape: BoxShape.rectangle,
                                      borderRadius: BorderRadius.circular(16),
                                      border: Border.all(
                                          color: Gcolors.primaryColor100)),
                                  child: Padding(
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 16, vertical: 23),
                                    child: TextField(
                                      style: GoogleFonts.inter(
                                          textStyle: const TextStyle(
                                              color: Gcolors.primaryColor050,
                                              fontSize: 14)),
                                      decoration:
                                          const InputDecoration.collapsed(
                                              hintText: 'Add Description',
                                              hintStyle: TextStyle(
                                                  color:
                                                      Gcolors.neutralColor400)),
                                    ),
                                  ),
                                ),
                              ),
                              Expanded(
                                child: Row(
                                  children: [
                                    //date
                                    Expanded(
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Padding(
                                            padding: const EdgeInsets.only(
                                                top: 24, bottom: 8),
                                            child: Row(
                                              children: [
                                                const SizedBox(
                                                  width: 16,
                                                ),
                                                Text(
                                                  'Date',
                                                  style: GoogleFonts.inter(
                                                      textStyle: const TextStyle(
                                                          color: Gcolors
                                                              .primaryColor100,
                                                          fontWeight:
                                                              FontWeight.w600,
                                                          fontSize: 16)),
                                                ),
                                              ],
                                            ),
                                          ),
                                          Expanded(
                                            child: Container(
                                              height: 64,
                                              width: 140,
                                              decoration: BoxDecoration(
                                                  shape: BoxShape.rectangle,
                                                  borderRadius:
                                                      BorderRadius.circular(16),
                                                  border: Border.all(
                                                      color: Gcolors
                                                          .primaryColor100)),
                                              child: Padding(
                                                padding: const EdgeInsets.only(
                                                    top: 4, left: 16),
                                                child: DateTimePicker(
                                                  initialValue: 'choose date',
                                                  firstDate: DateTime(2000),
                                                  lastDate: DateTime(2100),
                                                  dateLabelText: 'Date',
                                                  decoration:
                                                      const InputDecoration(
                                                    border: InputBorder.none,
                                                  ),
                                                  style: GoogleFonts.inter(
                                                      textStyle:
                                                          const TextStyle(
                                                    color:
                                                        Gcolors.neutralColor400,
                                                    fontSize: 14,
                                                  )),
                                                  onChanged: (val) =>
                                                      print(val),
                                                  validator: (val) {
                                                    print(val);
                                                    return null;
                                                  },
                                                  onSaved: (val) => print(val),
                                                ),
                                              ),
                                            ),
                                          )
                                        ],
                                      ),
                                    ),
                                    const SizedBox(
                                      width: 16,
                                    ),
                                    //time
                                    Expanded(
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Padding(
                                            padding: const EdgeInsets.only(
                                                top: 24, bottom: 8),
                                            child: Row(
                                              children: [
                                                const SizedBox(
                                                  width: 16,
                                                ),
                                                Text(
                                                  'Time',
                                                  style: GoogleFonts.inter(
                                                      textStyle: const TextStyle(
                                                          color: Gcolors
                                                              .primaryColor100,
                                                          fontWeight:
                                                              FontWeight.w600,
                                                          fontSize: 16)),
                                                ),
                                              ],
                                            ),
                                          ),
                                          Container(
                                            width: 140,
                                            height: 64,
                                            decoration: BoxDecoration(
                                                border: Border.all(
                                                    color: Gcolors
                                                        .primaryColor100),
                                                borderRadius:
                                                    const BorderRadius.all(
                                                        Radius.circular(20))),
                                            child: ElevatedButton(
                                              onPressed: () {
                                                _selectTime(context);
                                              },
                                              style: ElevatedButton.styleFrom(
                                                  backgroundColor:
                                                      Gcolors.neutralColor900,
                                                  shape: RoundedRectangleBorder(
                                                    borderRadius:
                                                        BorderRadius.circular(
                                                            20),
                                                  )),
                                              child: Text(
                                                "${selectedTime.hour}:${selectedTime.minute}",
                                                style: GoogleFonts.inter(
                                                    textStyle: const TextStyle(
                                                        fontSize: 14,
                                                        color: Gcolors
                                                            .neutralColor400)),
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.only(top: 36, left: 90),
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                            backgroundColor: Gcolors.primaryColor400,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(16),
                            )),
                        onPressed: () {
                          Navigator.pop(context);
                        },
                        child: Padding(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 16, vertical: 20),
                          child: Text(
                            'Set task',
                            style: GoogleFonts.inter(
                                textStyle: const TextStyle(
                                    fontSize: 20,
                                    color: Gcolors.neutralColor1000,
                                    fontWeight: FontWeight.w600)),
                          ),
                        ),
                      ),
                    )
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
