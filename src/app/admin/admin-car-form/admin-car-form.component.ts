import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Car, CarService } from 'src/app/services/car.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-car-form',
  templateUrl: './admin-car-form.component.html',
  styleUrls: ['./admin-car-form.component.css']
})
export class AdminCarFormComponent implements OnInit, OnChanges {
  @Input() car: Car | null = null;
  @Output() carSaved = new EventEmitter<void>();

  carForm!: FormGroup;
  selectedImage!: File;
  selectedPhotoName: string = '';

  carBrands: string[] = [
    'Ferrari',
    'Lamborghini',
    'Bugatti',
    'McLaren',
    'Porsche',
    'Audi',
    'Mercedes',
    'BMW',
    'Aston Martin',
    'Koenigsegg',
    'Pagani',
    'Lotus',
    'Tesla',
    'Rimac',
    'Maserati',
    'AlfaRomeo',
    'Chevrolet Corvette',
    'Ford',
    'Lexus',
    'Jaguar',
    'RollsRoyce',
    'Bentley',
    'Genesis',
    'Cadillac',
    'Dodge',
    'Nissan',
    'Toyota',
    'Peugeot',
    'Renault',
    'Citroën'
  ];
  
  modelOptions: { [key: string]: string[] } = {
    Ferrari: ['458 Italia', '488 GTB', 'F8 Tributo', 'SF90 Stradale', 'LaFerrari', '812 Superfast'],
    Lamborghini: ['Aventador', 'Huracán', 'Urus', 'Revuelto', 'Sian'],
    Bugatti: ['Chiron', 'Divo', 'Veyron', 'Bolide', 'La Voiture Noire'],
    McLaren: ['720S', '765LT', 'Artura', 'P1', 'Speedtail', 'Elva'],
    Porsche: ['911 GT3 RS', 'Cayenne', 'Panamera', 'Taycan', 'Macan', '918 Spyder'],
    Audi: ['A4', 'RS3', 'RS5', 'RS6 Avant', 'R8', 'Q8', 'e-tron GT'],
    Mercedes: ['A-Class', 'C-Class', 'E-Class', 'G63 AMG', 'SLS AMG', 'AMG GT'],
    BMW: ['M2', 'M3', 'M4', 'i8', 'Z4', 'X6M'],
    'Aston Martin': ['DB11', 'DBS Superleggera', 'Vantage', 'Rapide', 'Valhalla'],
    Koenigsegg: ['Jesko', 'Regera', 'Agera RS', 'Gemera'],
    Pagani: ['Huayra', 'Zonda R', 'Utopia', 'Zonda F'],
    Lotus: ['Evija', 'Emira', 'Elise', 'Exige'],
    Tesla: ['Model S Plaid', 'Model X', 'Model 3', 'Roadster'],
    Rimac: ['Nevera', 'Concept One'],
    Maserati: ['MC20', 'Levante', 'Ghibli', 'GranTurismo'],
    AlfaRomeo: ['Giulia Quadrifoglio', 'Stelvio', '4C Spider'],
    'Chevrolet Corvette': ['C7', 'C8 Z06', 'ZR1'],
    Ford: ['Mustang GT500', 'GT40', 'Focus RS'],
    Lexus: ['LFA', 'RC F', 'IS 500'],
    Jaguar: ['F-Type', 'XKR', 'I-PACE'],
    RollsRoyce: ['Phantom', 'Ghost', 'Wraith', 'Cullinan'],
    Bentley: ['Continental GT', 'Bentayga', 'Flying Spur'],
    Genesis: ['G70', 'GV80'],
    Cadillac: ['CTS-V', 'Escalade V', 'Lyriq'],
    Dodge: ['Challenger Hellcat', 'Durango SRT', 'Viper'],
    Nissan: ['GT-R', '370Z', 'Z Nismo'],
    Toyota: ['Supra', 'GR86', 'Land Cruiser'],
    Peugeot: ['508 PSE', 'RCZ R'],
    Renault: ['Mégane RS', 'Clio V6'],
    Citroën: ['DS3 Performance', 'C4 VTS']
  };
  
  availableModels: string[] = [];

  constructor(private fb: FormBuilder, private carService: CarService) {}

  ngOnInit(): void {
    this.carForm = this.fb.group({
      brand: [''],
      model: [''],
      year: [2023],
      price: [0],
      description: [''],
      available: [true]
    });

    this.carBrands.sort();

    // Si on modifie une voiture dès l'ouverture du formulaire
    if (this.car) {
      this.carForm.patchValue(this.car);
      this.availableModels = this.modelOptions[this.car.brand] || [];
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.car) {
      this.carForm.patchValue(this.car);
      this.availableModels = this.modelOptions[this.car.brand] || [];
    } else {
      this.carForm.reset({ year: 2023, available: true });
      this.availableModels = [];
    }
  }

  onBrandChange(): void {
    const selectedBrand = this.carForm.get('brand')?.value;
    this.availableModels = this.modelOptions[selectedBrand] || [];
    this.carForm.get('model')?.setValue('');
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedImage = file;
      this.selectedPhotoName = file.name;
    }
  }

  submitForm(): void {
    const formData = new FormData();

    // Ajoute les champs du formulaire
    Object.entries(this.carForm.value).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    // Ajoute l'image si présente
    if (this.selectedImage) {
      formData.append('photo', this.selectedImage);
    }

    if (this.car && this.car.id) {
      this.carService.updateCar(this.car.id, formData).subscribe(() => {
        this.carSaved.emit();
        this.carForm.reset();
        this.selectedPhotoName = '';
      });
    } else {
      this.carService.createCar(formData).subscribe(() => {
        this.carSaved.emit();
        this.carForm.reset();
        this.selectedPhotoName = '';
      });
    }
  }
}
