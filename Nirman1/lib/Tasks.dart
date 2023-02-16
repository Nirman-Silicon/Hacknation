import 'package:flutter/material.dart';
import 'constants/color_constants.dart';

class ToDoTask extends StatelessWidget {
  final String taskName;
  final bool taskCompleted;
  Function(bool?)? onChanged;

  ToDoTask(
      {super.key,
      required this.taskName,
      required this.taskCompleted,
      required this.onChanged});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(left: 15, right: 15, bottom: 15),
      decoration: BoxDecoration(
          color: Gcolors.neutralColor900,
          borderRadius: BorderRadius.circular(20)),
      child: Column(
        children: [
          Row(
            //crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Transform.scale(
                scale: 1.3,
                child: Checkbox(
                  
                  value: taskCompleted,
                  onChanged: onChanged,
                  activeColor: Gcolors.primaryColor400,
                  checkColor: Gcolors.neutralColor1000,
                  side: MaterialStateBorderSide.resolveWith((states) =>
                      BorderSide(width: 2, color: Gcolors.primaryColor050)),
                ),
              ),
              Text(
                taskName,
                style: TextStyle(fontSize: 18, color: Gcolors.primaryColor050),
              ),
              SizedBox(width: 100),
              Icon(Icons.edit_document, color: Gcolors.primaryColor400),
              
            ],
          ),
          Divider(
            thickness: 1,
            color: Gcolors.primaryColor050,
          )
        ],
        
      ),
    );
  }
}
