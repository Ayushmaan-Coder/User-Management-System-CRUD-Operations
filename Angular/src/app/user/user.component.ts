//user.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  isSuccess: boolean = false;
  userForm!: FormGroup;
  user: any = {};
  users: any[] = [];
  showForm: boolean = false;
  showAddUserButton: boolean = true;
  showUpdateForm: boolean = false;
  updateUserForm!: FormGroup;
  showEditIcon: boolean = true;
  showEditButton: boolean = true;


  constructor(private userService: UserService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe((data: any) => {
      this.users = data;
    });

    // Initialize the userForm with the FormBuilder
    this.userForm = this.formBuilder.group({
      organization_name: ['', Validators.required],
      user_name: ['', Validators.required],
      password: ['', Validators.required],
      phone_num: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      registration_num: ['', Validators.required],
      // Initialize the ipaddresses as a FormArray
      ipaddresses: this.formBuilder.array([]),
    });

    // Initialize the updateUserForm (if needed)
    this.updateUserForm = this.formBuilder.group({
      organization_name: [''],
      user_name: [''],
      password: [''],
      phone_num: [''],
      email: [''],
      registration_num: [''],
    });
  }

  toggleFormVisibility() {
    this.showForm = !this.showForm;
  }

  hideAddUserButton() {
    this.showAddUserButton = !this.showAddUserButton;
  }

  toggleIconVisibility()
  {
    this.showEditButton = !this.showEditButton;
  }

  createUser() {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      this.userService.createUser(user).subscribe(
        (response) => {
          // After successful creation, update the user list to reflect the changes.
          this.userService.getAllUsers().subscribe((data: any) => {
            this.users = data;
          });

          // Reset the form data
          this.userForm.reset();

          // Hide the form and show the "Add User" button again
          this.toggleFormVisibility();
          this.showAddUserButton = true;
        }
      );
    } else {
      console.log("Invalid Form");

      this.userService.getAllUsers().subscribe((data: any) => {
        this.users = data;
      });
    }
  }
  

  deleteUser(userId: number) {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      this.userService.deleteUser(userId).subscribe(() => {
        // After successful deletion, update the user list to reflect the changes.
        this.userService.getAllUsers().subscribe((data: any) => {
          this.users = data;
        });
      });
    }
  }

  editOrgNameField(user: any) {
    user.isEditingOrgName = true;
    user.editedOrganizationName = user.organization_name;
  }

  editUserNameField(user: any) {
    user.isEditingUserName = true;
    user.editedUserName = user.user_name;
  }

  editPasswordField(user: any) {
    user.isEditingPassword = true;
    user.editedPassword = user.password;
  }

  editPhoneNumField(user: any) {
    user.isEditingPhoneNum = true;
    user.editedPhoneNum = user.phone_num;
  }

  editEmailField(user: any) {
    user.isEditingEmail = true;
    user.editedEmail = user.email;
  }

  editRegistrationNumField(user: any) {
    user.isEditingRegistrationNum = true;
    user.editedRegistrationNum = user.registration_num;
  }

  startUpdate(user: any) {
    // Initialize the user with the selected user for update
    this.user = user;
  
    // Initialize the update form with the current values
    this.updateUserForm.setValue({
      organization_name: user.organization_name,
      user_name: user.user_name,
      password: user.password,
      phone_num: user.phone_num,
      email: user.email,
      registration_num: user.registration_num,
    });
  
    // Show the update form and hide the "Edit" button
    this.showUpdateForm = true;
    this.showEditIcon = false;
  }

  cancelUpdate() {
    this.showUpdateForm = false;
    this.updateUserForm.reset();
  }

  updateUser() {
    if (this.updateUserForm.valid) {
      const updatedUser = this.updateUserForm.value;
      const userId = this.user.id;
      this.userService.updateUser(userId, updatedUser).subscribe(() => {
        // Update the local user data
        this.user.organization_name = updatedUser.organization_name;
        this.user.user_name = updatedUser.user_name;
        this.user.password = updatedUser.password;
        this.user.phone_num = updatedUser.phone_num;
        this.user.email = updatedUser.email;
        this.user.registration_num = updatedUser.registration_num;
        // Hide the update form
        this.showUpdateForm = false;
      });
    }
  }

  saveUser(user: any) {
    user.isEditingOrgName = false;
    user.isEditingUserName = false;
    user.isEditingPassword = false;
    user.isEditingPhoneNum = false;
    user.isEditingEmail = false;
    user.isEditingRegistrationNum = false;
  }
  

  addIPAddress() {
    const ipaddresses = this.userForm.get('ipaddresses') as FormArray;
    ipaddresses.push(this.formBuilder.group({ ip_address: '' }));
  }

  removeIPAddress(index: number) {
    const ipaddresses = this.userForm.get('ipaddresses') as FormArray;
    ipaddresses.removeAt(index);
  }
}
