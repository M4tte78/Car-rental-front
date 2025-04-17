import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brandColor'
})
export class BrandColorPipe implements PipeTransform {
  transform(brand: string): string {
    const brandColors: { [key: string]: string } = {
      Ferrari: '#d90429',            // rouge Ferrari
      Lamborghini: '#28a745',        // vert vif
      Bugatti: '#001f54',            // bleu foncé classique
      McLaren: '#ff6f00',            // orange papaye
      Porsche: '#ffc107',            // jaune
      Audi: '#0d6efd',               // bleu foncé
      Mercedes: '#6c757d',           // gris clair
      BMW: '#0077b6',                // bleu BMW
      'Aston Martin': '#343a40',     // gris anthracite
      Koenigsegg: '#f72585',         // rose magenta
      Pagani: '#5c5470',             // violet/gris métallique
      Lotus: '#1fab89',              // vert racing
      Tesla: '#e50914',              // rouge électrique
      Rimac: '#3f37c9',              // bleu électrique
      Maserati: '#3a0ca3',           // bleu profond
      AlfaRomeo: '#a4161a',          // rouge foncé italien
      'Chevrolet Corvette': '#ffbb00', // jaune corvette
      Ford: '#003566',               // bleu foncé
      Lexus: '#444444',              // gris luxe
      Jaguar: '#0a9396',             // turquoise foncé
      RollsRoyce: '#6c3483',         // violet royal
      Bentley: '#344e41',            // vert foncé anglais
      Genesis: '#2d6a4f',            // vert forêt
      Cadillac: '#b08968',           // bronze
      Dodge: '#bb342f',              // rouge muscle
      Nissan: '#e63946',             // rouge sport
      Toyota: '#7b2cbf',             // violet foncé
      Peugeot: '#003049',            // bleu sombre
      Renault: '#ffca3a',            // jaune vif
      Citroën: '#ef476f',            // rose vif
    
      // marque par défaut si non reconnue
      default: '#999999'
    };

    return brandColors[brand] || '#999999'; // couleur par défaut
  }
}
