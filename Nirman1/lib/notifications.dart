// import 'package:flutter/material.dart';
// import 'constants/color_constants.dart';

// class header extends StatelessWidget {
//   const header({super.key});

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       backgroundColor: Gcolors.neutralColor1000,
//       body: Container(
//         child: Column(
//           children: [
//             SizedBox(
//               height: 24,
//             ),
//             Padding(
//               padding: const EdgeInsets.only(left: 36.0),
//               child: Text(
//                 'NOTIFICATION',
//                 style: TextStyle(
//                     fontSize: 16,
//                     fontFamily: 'Inter',
//                     fontWeight: FontWeight.w500),
//               ),
//             )
//           ],
//         ),
//       ),
//     );
//   }
// }

// class notification extends StatefulWidget {
//   const notification({super.key});

//   @override
//   State<notification> createState() => _notificationState();
// }

// class _notificationState extends State<notification> {
//   @override
//   Widget build(BuildContext context) {
//     return Container(
//       height: 99,
//       width: 366,
//       color: Gcolors.neutralColor900,
//       child: Column(
//         children: [
//           Text(
//             'Today',
//             style: TextStyle(
//                 fontSize: 12, fontFamily: 'Inter', fontWeight: FontWeight.w500),
//           ),
//           Container(
//             child: Row(
//               children: [
//                 Icon(Icons.list_rounded),
//                 Column(
//                   children: [
//                     Text(
//                       'FLAT Assignment',
//                       style: TextStyle(
//                           fontSize: 14,
//                           fontFamily: 'Inter',
//                           fontWeight: FontWeight.w500,
//                           color: Gcolors.primaryColor050),
//                     ),
//                     Text(
//                       '15th FEB - 12:30 pm',
//                       style: TextStyle(
//                           fontSize: 12,
//                           fontFamily: 'Inter',
//                           fontWeight: FontWeight.w600,
//                           color: Gcolors.primaryColor400),
//                     )
//                   ],
//                 ),
//                 SizedBox(
//                   width: 171,
//                   child: Icon(
//                     Icons.arrow_forward,
//                     color: Gcolors.neutralColor400,
//                   ),
//                 )
//               ],
//             ),
//           )
//         ],
//       ),
//     );
//   }
// }
