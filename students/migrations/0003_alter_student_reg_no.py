# Generated by Django 4.0.4 on 2022-04-25 17:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0002_rename_fathers_name_student_father_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='reg_no',
            field=models.IntegerField(default=3719, editable=False, unique=True),
        ),
    ]
