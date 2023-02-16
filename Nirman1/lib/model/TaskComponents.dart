import 'package:flutter/material.dart';

class TaskComponent {
  final String title;
  final String description;
  final DateTime date;
  final TimeOfDay time;
  final String id;
  final bool? onChanged;

  TaskComponent({
    required this.title,
    required this.description,
    required this.date,
    required this.time,
    required this.id,
    this.onChanged,
  });
}
